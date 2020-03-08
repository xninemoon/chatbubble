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
        background-color: white;
        padding: 10px;
        border-radius: 3px;
        display: inline-block;
    }
    
    .{{this.key}}-chat-bubble-sharp-angle{
        height: 0px;
        width: 0px;
        <%
        switch(this.position){
            case "north":
                <$
                border-color: transparent transparent white transparent;
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
                border-color: white transparent  transparent transparent;
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
                border-color: transparent transparent transparent white;
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
                border-color: transparent white transparent transparent ;
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
                <div class="{{this.key}}-chat-bubble-sharp-angle {{this.sharpAngleCss!''}}"></div>
                <div class="{{this.key}}-chat-bubble-container {{this.contentCss!''}}">{{this.content!''}}</div>
                $>
                break;
            case "south":
            case "east":
                <$
                <div class="{{this.key}}-chat-bubble-container">{{this.content}}</div>
                <div class="{{this.key}}-chat-bubble-sharp-angle  {{this.sharpAngleCss!''}}"></div>
                $>
                break;
        }
    %>
</div>
`;


export interface PopSettings {
    key?: string;
    content?: string;
    sharpAngleMarginStart?: number;
    sharpAngleMarginEnd?: number;
    contentCss?: string;
    sharpAngleCss?: string;
    position?: "north" | "west" | "south" | "east";
}

const guid = () => {
    return 'css-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const pop = (element: HTMLElement, settings: PopSettings)=>{
    settings.key = settings.key || guid();
    element.innerHTML += template(tmpl, settings);
}

