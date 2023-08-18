class Pledge {
  private readonly actionCallbacks: Array<(value: any) => any> = []
  private errorCallback = (value: any): any => { }
  constructor (action: (resolve: (value: any) => any, reject: (value: any) => any) => void) {
    action(this.onResolve.bind(this), this.onReject.bind(this))
    return this
  }

  private onResolve<A> (this: Pledge, value: A): any {
    let storedValue = value
    try {
      this.actionCallbacks.forEach(action => {
        storedValue = action(storedValue)
      })
      return storedValue
    } catch (err) {
      this.onReject(err)
    }
  }

  private onReject (this: Pledge, value: any): any {
    this.errorCallback(value)
  }

  then (this: Pledge, callback: (value: any) => any): Pledge {
    this.actionCallbacks.push(callback)
    return this
  }

  catch (this: Pledge, callback: (value: any) => any): Pledge {
    this.errorCallback = callback
    return this
  }
}

export default Pledge
