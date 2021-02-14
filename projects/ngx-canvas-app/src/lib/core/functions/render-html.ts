export interface HtmlConfig {
    tagName: string;
    id?: string;
    class?: string;
    style?: Partial<CSSStyleDeclaration>;
}

export function renderHtml(config: HtmlConfig): HTMLElement {
    const element = document.createElement(config.tagName);
    element.id = config.id;
    element.className = config.class;
    for (const key of Object.keys(config.style)) {
        element.style[key] = config.style[key];
    }
    return element;
}
