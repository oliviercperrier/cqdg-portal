export interface IClassNameProp {
    className?: string;
}

export interface IChildrenProp {
    children: React.ReactNode;
}

export interface IBasicProp extends IClassNameProp, IChildrenProp {}
