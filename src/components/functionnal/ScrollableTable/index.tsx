import React from 'react';
import debounce from 'lodash/debounce';
import { IBasicProp } from 'types/generic';

import './ScrollableTable.scss';

interface IScrollableTableProps extends IBasicProp {
    item?: string;
    itemToLoad?: number;
    resetScroll?: boolean;
}

const ScrollableTable = ({
    children,
    className = '',
    item,
    itemToLoad = 20,
    resetScroll = false,
}: IScrollableTableProps): React.ReactElement => {
    const scrollHander: any = null;

    const scrolledDiv = document.getElementById('table-scroll');
    if (scrolledDiv && resetScroll) {
        scrolledDiv.scrollTop = 0;
    }

    return (
        <div className="table-scrollable-container">
            <div
                className={`table-scrollable ${className}`}
                id="table-scroll"
                onScroll={(e) => {
                    e.persist();

                    /*if (!scrollHander) {
                        scrollHander = debounce(() => {
                            const isNearBottom =
                                e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
                            if (isNearBottom) {
                                const q = parse(window.location.search);
                                const offsetSize = parseIntParam(q[item], itemToLoad);
                                q[item] = offsetSize + itemToLoad;
                                const stringified = stringify(q);
                                history.push(`${window.location.pathname}?${stringified}`);
                            }
                        }, 150);
                    }
                    scrollHander();*/
                }}
            >
                {children}
            </div>
            <div className="scroll-overlay" />
        </div>
    );
};

export default ScrollableTable;
