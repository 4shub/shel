export const getXPathForElement = (element: HTMLElement) => {
    const idx: any = (sib: any, name?: any) => sib
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs: any = (elm: any) => !elm || elm.nodeType !== 1
        ? ['']
        : elm.id && document.querySelector(`#${elm.id}`) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}:th-child(${idx(elm)})`];

    return segs(element).join(' > ');
};

