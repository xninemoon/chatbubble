define("template.util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function template(tmpl, data) {
        var result = "const p = []; \n    function $empty(defaultValue) {\n        const t = p.pop();\n        if (t) {\n            p.push(t);\n        } else {\n            p.push(defaultValue);\n        }\n    }\n    p.push(`";
        result += tmpl
            .replace(/\{\{\s*([^(\}\})]+?)(|!([^(\}\})]+))\s*\}\}/g, "`); p.push($1); $empty($3); p.push(`")
            .replace(/<%|\$>/g, "`);")
            .replace(/%>|<\$/g, "p.push(`");
        result += "`); return p.join('');";
        console.log(data);
        console.log(result);
        return new Function(result).apply(data); // apply改变函数执行的作用域
    }
    exports.template = template;
});
define("chat.bubble", ["require", "exports", "template.util"], function (require, exports, template_util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tmpl = "\n<style>\n    .{{this.key}}-chat-bubble {\n        display: flex;\n        <%\n        if(!this.position) this.position = \"north\";\n        if(!this.sharpAngleMarginStart) this.sharpAngleMarginStart = 7;\n\n        if(this.position == \"north\" || this.position == \"south\" ){ \n            <$ \n            flex-direction: column; \n            $>\n        } else {\n            <$ flex-direction: row; $>\n        } \n        %>\n    }\n    \n    .{{this.key}}-chat-bubble-container {\n        background-color: white;\n        padding: 10px;\n        border-radius: 3px;\n        display: inline-block;\n    }\n    \n    .{{this.key}}-chat-bubble-sharp-angle{\n        height: 0px;\n        width: 0px;\n        <%\n        switch(this.position){\n            case \"north\":\n                <$\n                border-color: transparent transparent white transparent;\n                $>\n                if(this.sharpAngleMarginEnd){\n                    <$\n                    margin-right: {{this.sharpAngleMarginEnd}}px;\n                    align-self: flex-end;\n                    $>\n                    break;\n                }\n                if(this.sharpAngleMarginStart){\n                    <$\n                    margin-left: {{this.sharpAngleMarginStart}}px;\n                    align-self: flex-start;\n                    $>\n                }\n                break;\n            case \"south\":\n                <$\n                border-color: white transparent  transparent transparent;\n                $>\n                if(this.sharpAngleMarginEnd){\n                    <$\n                    margin-right: {{this.sharpAngleMarginEnd}}px;\n                    align-self: flex-end;\n                    $>\n                    break;\n                }\n                if(this.sharpAngleMarginStart){\n                    <$\n                    margin-left: {{this.sharpAngleMarginStart}}px;\n                    align-self: flex-start;\n                    $>\n                }\n                break;\n            case \"east\":\n                <$\n                border-color: transparent transparent transparent white;\n                $>\n                if(this.sharpAngleMarginEnd){\n                    <$\n                    margin-bottom: {{this.sharpAngleMarginEnd}}px;\n                    align-self: flex-end;\n                    $>\n                    break;\n                }\n                if(this.sharpAngleMarginStart){\n                    <$\n                    margin-top: {{this.sharpAngleMarginStart}}px;\n                    align-self: flex-start;\n                    $>\n                }\n                break;\n            case \"west\":\n                <$\n                border-color: transparent white transparent transparent ;\n                $>\n                if(this.sharpAngleMarginEnd){\n                    <$\n                    margin-bottom: {{this.sharpAngleMarginEnd}}px;\n                    align-self: flex-end;\n                    $>\n                    break;\n                }\n                if(this.sharpAngleMarginStart){\n                    <$\n                    margin-top: {{this.sharpAngleMarginStart}}px;\n                    align-self: flex-start;\n                    $>\n                }\n                break;\n        }\n        %>\n\n        border-width: {{this.sharpAngleWidth!7}}px;\n        border-style: solid;\n        position: relative;\n    }\n</style>\n\n<div class=\"{{this.key}}-chat-bubble\">\n    <%\n        switch(this.position){\n            case \"north\":\n            case \"west\":\n                <$\n                <div class=\"{{this.key}}-chat-bubble-sharp-angle {{this.sharpAngleCss!''}}\"></div>\n                <div class=\"{{this.key}}-chat-bubble-container {{this.contentCss!''}}\">{{this.content!''}}</div>\n                $>\n                break;\n            case \"south\":\n            case \"east\":\n                <$\n                <div class=\"{{this.key}}-chat-bubble-container\">{{this.content}}</div>\n                <div class=\"{{this.key}}-chat-bubble-sharp-angle  {{this.sharpAngleCss!''}}\"></div>\n                $>\n                break;\n        }\n    %>\n</div>\n";
    var guid = function () {
        return 'css-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    exports.pop = function (element, settings) {
        settings.key = settings.key || guid();
        element.innerHTML += template_util_1.template(tmpl, settings);
    };
});
define("index", ["require", "exports", "chat.bubble"], function (require, exports, chat_bubble_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chat_bubble_1.pop(document.querySelector("#container-right"), {
        content: "测试聊天气泡1",
        sharpAngleMarginEnd: 10,
        position: "east",
    });
    chat_bubble_1.pop(document.querySelector("#container-left"), {
        content: "测试聊天气泡2",
        sharpAngleMarginEnd: 10,
        position: "west",
    });
    chat_bubble_1.pop(document.querySelector("#container-top"), {
        content: "测试聊天气泡3",
        sharpAngleMarginEnd: 10,
        position: "north",
    });
    chat_bubble_1.pop(document.querySelector("#container-bottom"), {
        content: "测试聊天气泡4",
        sharpAngleMarginStart: 10,
        position: "south",
    });
});
