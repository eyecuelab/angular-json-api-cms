export function Extend(value: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = function(...args: any[]) {
        const result = originalMethod.apply(this, args);
        return Object.assign({}, value.call(), result);
      };
      return descriptor;
    };
}
