export const getTagBaselineSeries = (series, tag) => {
  const baseline = [];
  let preIndex = series.length - 2;
  let index = series.length - 1;

  while (baseline.length < 15 && index >= 0 && preIndex >= 0) {
    const preData = series[preIndex];
    const data = series[index];

    if (preData?.diary?.diaryTags?.some((t) => t._id !== tag._id)) {
      baseline.push(data);
    }
    preIndex -= 1;
    index -= 1;
  }
  return baseline;
}
