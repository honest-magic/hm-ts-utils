
class FreezeContext {
    private _visited: any[] = []

    public markVisited(obj: any) {
        this._visited.push(obj);
    }

    public alreadyVisited(obj: any) {
        return this._visited.indexOf(obj) != -1;
    }

}

function deepFreezeWithContext<T>(obj: T, context: FreezeContext) {
    var propNames = Object.getOwnPropertyNames(obj);
    for (let name of propNames) {
        let value = (obj as any)[name];
        if (value && typeof value === "object") {
            if (!context.alreadyVisited(value)) {
                context.markVisited(value);
                deepFreezeWithContext(value, context);
            }
        }
    }
    return Object.freeze(obj);
}


export function deepFreeze<T>(obj: T) {
    const context = new FreezeContext();
    return deepFreezeWithContext(obj, context)
}