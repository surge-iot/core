import { Injectable, Inject } from '@nestjs/common';
import { DeviceModel } from 'src/database/models/device.model';
import { FogmrFunctionModel } from 'src/database/models/fogmr-function.model';
import { ModelClass } from 'objection';
import { FogmrTaskModel } from 'src/database/models/fogmr-task.model';
import { FogmrReducerModel } from 'src/database/models/fogmr-reducer.model';
import { FogmrMapperModel } from 'src/database/models/fogmr-mapper.model';

@Injectable()
export class OrchestratorService {
  constructor(
    @Inject('DeviceModel') private deviceModelClass: ModelClass<DeviceModel>,
    @Inject('FogmrFunctionModel') private fogmrFunctionModelClass: ModelClass<FogmrFunctionModel>,
    @Inject('FogmrTaskModel') private fogmrTaskModelClass: ModelClass<FogmrTaskModel>,
    @Inject('FogmrReducerModel') private fogmrReducerModelClass: ModelClass<FogmrReducerModel>,
    @Inject('FogmrMapperModel') private fogmrMapperModelClass: ModelClass<FogmrMapperModel>,
  ) { }

  async createTask(inputDeviceSerials: string[], outputDeviceSerial: string, fogmrFunctionName: string) {
    const inputDevices: DeviceModel[] = await this.deviceModelClass.query().whereIn('serial', inputDeviceSerials);
    const outputDevice: DeviceModel = await this.deviceModelClass.query().findOne({ serial: outputDeviceSerial });
    const fogmrFunction = await this.fogmrFunctionModelClass.query().findOne({ name: fogmrFunctionName });

    // console.log(inputDevices, outputDevice, fogmrFunction);
    const task = await this.fogmrTaskModelClass.query()
      .insertGraphAndFetch({
        fogmrFunction: {
          '#dbRef': fogmrFunction.id
        }
      });
    console.log(task);
    const promises = inputDevices.map(async inputDevice => {
      const gateway: DeviceModel = await this.deviceModelClass.query().findOne({ serial: inputDevice.meta['gateway'] });
      if (!gateway) {
        return null;
      }
      const mapper = await this.fogmrMapperModelClass.query()
        .insertGraphAndFetch({
          task: { '#dbRef': task.id },
          inputDevice: { '#dbRef': inputDevice.id }, // Assign the gateway where t
          executor: { '#dbRef': gateway.id }
        });
      return mapper;
    })
    const mappers:FogmrMapperModel[] = await Promise.all(promises);
    console.log(mappers);
    const reducer = await this.fogmrReducerModelClass.query()
      .insertGraphAndFetch({
        task: {'#dbRef': task.id},
        outputDevice: {'#dbRef': outputDevice.id}, 
        executor: {'#dbRef': mappers[0].executor.id} // Assign the first mapper gateway as executor
        // TODO: Write better reducer gateway selection algorithm
      });
    console.log(reducer);

  }
}
