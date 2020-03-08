import { template } from "./template.util";

const tmpl = `
<style>
    .{{this.key}}-chat-bubble {
        display: flex;
        <%
        if(!this.position) this.position = "north";
        if(!this.sharpAngleMarginStart) this.sharpAngleMarginStart = 7;

        if(this.position == "north" || this.position == "south" ){ 
            <$ 
            flex-direction: column; 
            $>
        } else {
            <$ flex-direction: row; $>
        } 
        %>
    }
    
    .{{this.key}}-chat-bubble-container {
        background-color: {{this.backgroundColor}};
        border-radius: {{this.bubbleRadius}}px;
        padding: {{this.bubblePadding}};
        display: inline-block;
    }
    
    .{{this.key}}-chat-bubble-sharp-angle{
        height: 0px;
        width: 0px;
        <%
        switch(this.position){
            case "north":
                <$
                border-color: transparent transparent {{this.backgroundColor}} transparent;
                $>
                if(this.sharpAngleMarginEnd){
                    <$
                    margin-right: {{this.sharpAngleMarginEnd}}px;
                    align-self: flex-end;
                    $>
                    break;
                }
                if(this.sharpAngleMarginStart){
                    <$
                    margin-left: {{this.sharpAngleMarginStart}}px;
                    align-self: flex-start;
                    $>
                }
                break;
            case "south":
                <$
                border-color: {{this.backgroundColor}} transparent  transparent transparent;
                $>
                if(this.sharpAngleMarginEnd){
                    <$
                    margin-right: {{this.sharpAngleMarginEnd}}px;
                    align-self: flex-end;
                    $>
                    break;
                }
                if(this.sharpAngleMarginStart){
                    <$
                    margin-left: {{this.sharpAngleMarginStart}}px;
                    align-self: flex-start;
                    $>
                }
                break;
            case "east":
                <$
                border-color: transparent transparent transparent {{this.backgroundColor}};
                $>
                if(this.sharpAngleMarginEnd){
                    <$
                    margin-bottom: {{this.sharpAngleMarginEnd}}px;
                    align-self: flex-end;
                    $>
                    break;
                }
                if(this.sharpAngleMarginStart){
                    <$
                    margin-top: {{this.sharpAngleMarginStart}}px;
                    align-self: flex-start;
                    $>
                }
                break;
            case "west":
                <$
                border-color: transparent {{this.backgroundColor}} transparent transparent ;
                $>
                if(this.sharpAngleMarginEnd){
                    <$
                    margin-bottom: {{this.sharpAngleMarginEnd}}px;
                    align-self: flex-end;
                    $>
                    break;
                }
                if(this.sharpAngleMarginStart){
                    <$
                    margin-top: {{this.sharpAngleMarginStart}}px;
                    align-self: flex-start;
                    $>
                }
                break;
        }
        %>

        border-width: {{this.sharpAngleWidth!7}}px;
        border-style: solid;
        position: relative;
    }
</style>

<div class="{{this.key}}-chat-bubble">
    <%
        switch(this.position){
            case "north":
            case "west":
                <$
                <div class="{{this.key}}-chat-bubble-sharp-angle"></div>
                <div class="{{this.key}}-chat-bubble-container">{{this.content!''}}</div>
                $>
                break;
            case "south":
            case "east":
                <$
                <div class="{{this.key}}-chat-bubble-container">{{this.content!''}}</div>
                <div class="{{this.key}}-chat-bubble-sharp-angle"></div>
                $>
                break;
        }
    %>
</div>
`;


export interface PopSettings {
    key?: string;  // id, 如果不设置将使用 guid
    content?: string; // 气泡内容 html 
    bubblePadding?: string; // 气泡 padding
    bubbleRadius?: number; // 气泡圆角
    sharpAngleWidth?: number; // 尖角宽度
    sharpAngleMarginStart?: number; // 尖角与上或者左的距离
    sharpAngleMarginEnd?: number; // 尖角与下或者右的距离，如果同时设置sharpAngleMarginStart和sharpAngleMarginEnd，优先应用sharpAngleMarginEnd
    backgroundColor?:string; // 背景颜色
    position?: "north" | "west" | "south" | "east";
}

const guid = () => {
    return 'css-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const pop = (element: HTMLElement, settings: PopSettings)=>{
    settings.key = settings.key || guid();
    settings.backgroundColor = settings.backgroundColor || "white";
    settings.sharpAngleWidth = settings.sharpAngleWidth || 7;
    settings.bubbleRadius = settings.bubbleRadius || 5;
    settings.bubblePadding = settings.bubblePadding || "10px";
    element.innerHTML += template(tmpl, settings);
}

