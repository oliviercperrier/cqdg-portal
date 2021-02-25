import React from 'react';

import { t } from '../locales/translate';

export const labelDisplayName = (label: string): React.ReactNode | string => t(label) || label;
