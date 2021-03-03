export const fileMapping: Map<string, string> = new Map([
    ['gender', 'donors.gender'],
    ['ethnicity', 'donors.ethnicity'],
    ['age_at_recruitment', 'donors.age_at_recruitment'],
    ['vital_status', 'donors.vital_status'],
    ['files.file_id', 'file_id'],
    ['submitter_donor_id', 'donors.submitter_donor_id'],
    ['short_name_keyword', 'study.short_name_keyword'],
]);

export const donorMapping: Map<string, string> = new Map([
    ['data_category', 'files.data_category'],
    ['data_type', 'files.data_type'],
    ['file_format', 'files.file_format'],
    ['data_access', 'files.data_access'],
    ['platform', 'files.platform'],
    ['experimental_strategy', 'files.experimental_strategy'],
    ['is_harmonized', 'files.is_harmonized'],
    ['file_id', 'files.file_id'],
    ['donors.submitter_donor_id', 'submitter_donor_id'],
    ['short_name_keyword', 'study.short_name_keyword'],
]);

export const studyMapping: Map<string, string> = new Map([]);
