// eslint-disable-next-line import/prefer-default-export
export const isCheckedInDiary = (diary) => {
  if (diary?.mood || diary?.diaryTags.length > 0) {
    return true;
  }

  return false;
};
