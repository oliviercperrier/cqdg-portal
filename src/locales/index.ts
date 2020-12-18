import en from './en/translation.json';
import fr from './fr/translation.json';
import { flatLocale } from './utils';

type TTranslation = Record<string, Record<string, string>>;

const translations: TTranslation = {
    en: flatLocale(en),
    fr: flatLocale(fr),
};

export default translations;
