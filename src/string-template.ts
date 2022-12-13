
type StringProvider = string | (() => string)

export class StringTemplate {

    private parseTree: Node

    constructor(template: string) {

        // parse the string an safe the places where the variables
        // are placed while remove the variables.
        const chars = [...template];
        chars.forEach((c, i) => console.log(c, i));


    }

    substitute(mapping: Map<string, StringProvider>): string {
        return ''
    }

}

class Node {
    prev?: Node
    next?: Node
}


class TextNode extends Node {

    constructor(text: string) {
        super()
    }

}

class VariableNode extends Node {

    constructor(text: string) {
        super()
    }

}

class Variable {

    private nodes: VariableNode[] = []

    constructor(name: string) {

    }

    addNode(node: VariableNode) {
        this.nodes.push(node)
    }

    removeNode(node: VariableNode) {

        let idx = this.nodes.indexOf(node)
        if (idx >= 0) {
            this.nodes.splice(idx, 1)
        }

    }

    getNodes(): VariableNode[] {
        return this.nodes
    }

}