import {StringTemplate, TextNode, VariableMapping, VariableNode} from "./string_template.js";

import "mocha";
import {expect} from "chai";

describe('StringTemplate', () => {

    describe('Parsing/Constructor', () => {

        it("Should contain one TextNode", () => {

            const template = new StringTemplate("Hello World!");
            expect(template.nodes[0]).to.not.be.null.and.not.be.undefined;
            expect(template.nodes[0]).to.be.instanceof(TextNode);

            const textNode = template.nodes[0] as TextNode;
            expect(textNode.text).to.be.equal('Hello World!');

        });

        it("Should contain one VariableNode", () => {

            const template = new StringTemplate("${this is a simple test}");
            expect(template.nodes[0]).to.not.be.null.and.not.be.undefined;
            expect(template.nodes[0]).to.be.instanceof(VariableNode);

            const varNode = template.nodes[0] as VariableNode;
            expect(varNode.variable.name).to.be.equal('this is a simple test');

        });

        it("Node array should be unmodifiable", () => {

            const template = new StringTemplate("Freezing objects.");
            expect(() => template.nodes.push(new TextNode("Heating up..."))).to.throw(Error);

        });

        it("Simple template parsing should work", () => {

            const template = new StringTemplate("Hello ${salutation} ${firstname} ${lastname}, how are you ${firstname}?");
            expect(template.nodes.length).to.be.equal(9);

            expect(template.nodes[0]).to.be.instanceof(TextNode);
            expect((template.nodes[0] as TextNode).text).to.be.equal("Hello ");

            expect(template.nodes[1]).to.be.instanceof(VariableNode);
            expect((template.nodes[1] as VariableNode).variable.name).to.be.equal("salutation");

            expect(template.nodes[2]).to.be.instanceof(TextNode);
            expect((template.nodes[2] as TextNode).text).to.be.equal(" ");

            expect(template.nodes[3]).to.be.instanceof(VariableNode);
            expect((template.nodes[3] as VariableNode).variable.name).to.be.equal("firstname");

            expect(template.nodes[4]).to.be.instanceof(TextNode);
            expect((template.nodes[4] as TextNode).text).to.be.equal(" ");

            expect(template.nodes[5]).to.be.instanceof(VariableNode);
            expect((template.nodes[5] as VariableNode).variable.name).to.be.equal("lastname");

            expect(template.nodes[6]).to.be.instanceof(TextNode);
            expect((template.nodes[6] as TextNode).text).to.be.equal(", how are you ");

            expect(template.nodes[7]).to.be.instanceof(VariableNode);
            expect((template.nodes[7] as VariableNode).variable.name).to.be.equal("firstname");

            expect(template.nodes[8]).to.be.instanceof(TextNode);
            expect((template.nodes[8] as TextNode).text).to.be.equal("?");

            expect(template.variables.find((v) => v.name === "salutation").usageCount()).to.be.equal(1);
            expect(template.variables.find((v) => v.name === "lastname").usageCount()).to.be.equal(1);
            expect(template.variables.find((v) => v.name === "firstname").usageCount()).to.be.equal(2);


        });


    });

    describe('Substitution #1: Simple string replacements', () => {

        let template: StringTemplate;

        beforeEach(() => {
            template = new StringTemplate("${a} ${b} $${c}");
        });

        it('should escape correct', () => {

            let variables: VariableMapping = {
                mapping: {
                    a: "Hello",
                    b: "World",
                    c: () => "X"
                }
            }

            const result = template.substitute(variables)
            expect(result).to.be.equal("Hello World ${c}");

        });

        it('should use string provider functions', () => {

            let variables: VariableMapping = {
                mapping: {
                    a: () => "Hello",
                    b: () => "World",
                    c: () => "X"
                }
            }

            const result = template.substitute(variables)
            expect(result).to.be.equal("Hello World ${c}");

        });

        it('should throw an error on missing mapping', () => {

            let variables: VariableMapping = {
                mapping: {
                    a: () => "Hello",
                    c: () => "X"
                }
            }

            expect(() => template.substitute(variables)).to.throw("No mapping found for ${b}");

        });

        context('replacement operations', () => {


            it('replacement transformation: none', () => {
                let templateTransform = new StringTemplate("${property}");
                let variables: VariableMapping = {
                    mapping: {
                        property: () => "Hello World!"
                    }
                }
                expect(templateTransform.substitute(variables)).to.be.equal("Hello World!");
            });
            it('replacement transformation: ^^', () => {
                let templateTransform = new StringTemplate("${property^^}");
                let variables: VariableMapping = {
                    mapping: {
                        property: () => "Hello World!"
                    }
                }
                expect(templateTransform.substitute(variables)).to.be.equal("HELLO WORLD!");
            });
            it('replacement transformation: ,,', () => {
                let templateTransform = new StringTemplate("${property,,}");
                let variables: VariableMapping = {
                    mapping: {
                        property: () => "Hello World!"
                    }
                }
                expect(templateTransform.substitute(variables)).to.be.equal("hello world!");
            });
            it('replacement transformation: ^', () => {
                let templateTransform = new StringTemplate("${property^}");
                let variables: VariableMapping = {
                    mapping: {
                        property: () => "Hello World!"
                    }
                }
                expect(templateTransform.substitute(variables)).to.be.equal("Hello World!");
            });
            it('replacement transformation: ,', () => {
                let templateTransform = new StringTemplate("${property,}");
                let variables: VariableMapping = {
                    mapping: {
                        property: () => "Hello World!"
                    }
                }
                expect(templateTransform.substitute(variables)).to.be.equal("hello World!");
            });
        })


    });

});

