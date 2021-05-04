export interface IClassNameProp {
    className?: string;
}
export interface IICon {
    className?: string;
    size?: number;
    colored?: boolean;
}

export interface IChildrenProp {
    children: React.ReactNode;
}

export interface IBasicProp extends IClassNameProp, IChildrenProp {}
