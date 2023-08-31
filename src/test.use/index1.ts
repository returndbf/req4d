function Decorator1():MethodDecorator {
    console.log("Decorator1");
    return ()=>{

    }

}

function Decorator2():MethodDecorator {
    console.log("Decorator2");
    return ()=>{

    }

}
class Example {
    @Decorator1()
    @Decorator2()
    method() {}
}

const example = new Example();
example.method();
