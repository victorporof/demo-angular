// @ts-ignore
const createTask = console.createTask ?? (() => {});

const tasks = new WeakMap();

export class AsyncStackTaggingZoneSpec implements ZoneSpec {
  runZone = Zone.current;

  constructor(public name: string = 'Zone') {}

  onScheduleTask(
    delegate: ZoneDelegate,
    current: Zone,
    target: Zone,
    task: Task
  ): Task {
    tasks.set(task, createTask(`${this.name} – ${task.source || task.type}`));
    return delegate.scheduleTask(target, task);
  }

  onInvokeTask(
    delegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    task: Task,
    applyThis: any,
    applyArgs?: any[]
  ) {
    const scheduled = tasks.get(task);
    if (scheduled) {
      return scheduled.run(() => {
        return delegate.invokeTask(targetZone, task, applyThis, applyArgs);
      });
    }
    return delegate.invokeTask(targetZone, task, applyThis, applyArgs);
  }
}
