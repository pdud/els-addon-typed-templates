"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syntax_1 = require("@glimmer/syntax");
const ast_helpers_1 = require("./ast-helpers");
function cleanComment(text) {
    return text.replace(/<\/?script[^>]*>/g, '');
}
function getClassMeta(source) {
    const nodes = [];
    const comments = [];
    try {
        const node = syntax_1.preprocess(source);
        syntax_1.traverse(node, {
            MustacheStatement(node) {
                //@ts-ignore
                if (!node.isIgnored) {
                    nodes.push([node]);
                }
            },
            MustacheCommentStatement(node) {
                if (node.loc) {
                    comments.push([node.loc.end.line + 1, cleanComment(node.value)]);
                }
            },
            BlockStatement(node) {
                nodes.push([node]);
            },
            ElementModifierStatement(node) {
                nodes.push([node]);
            },
            ElementNode(node) {
                if (ast_helpers_1.isSimpleBlockComponentElement(node)) {
                    nodes.push([ast_helpers_1.tagComponentToBlock(node)]);
                }
                else if (node.tag === 'script' && node.attributes.find(({ name }) => name === '@typedef')) {
                    const text = node.children.find(({ type }) => type === 'TextNode');
                    if (text) {
                        comments.push([node.loc.end.line + 1, text.chars]);
                    }
                }
            },
            SubExpression(node) {
                if (nodes[nodes.length - 1]) {
                    nodes[nodes.length - 1].push(node);
                }
                else {
                    console.log("unexpectedSubexpression", node);
                }
            }
        });
    }
    catch (e) {
        // 
    }
    return {
        nodes, comments
    };
}
exports.getClassMeta = getClassMeta;
//# sourceMappingURL=ast-parser.js.map