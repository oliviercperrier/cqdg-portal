export interface IClassNameProp {
    className?: string;
}

export interface IChildrenProp {
    children: React.ReactNode;
}

// eslint-disable-next-line prettier/prettier
export interface IBasicProp extends IClassNameProp, IChildrenProp { }
