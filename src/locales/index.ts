import en from './en/translation.json';
import fr from './fr/translation.json';

type TTranslation = Record<string, Record<string, string>>;

const flatLocale = (locale: Record<string, any>, path: string[] = [], data: any = {}): any => {
    Object.entries(locale).forEach((d) => {
        const [key, value] = d;
        if (typeof value === 'object') {
            flatLocale(value, path.concat(key), data);
        } else {
            data[path.concat(key).join('.')] = value;
        }
    });
    return data;
};

const translations: TTranslation = {
    en: flatLocale(en),
    fr: flatLocale(fr),
};

export default translations;
