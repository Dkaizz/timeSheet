function countingTime(h, m, s) {
  if (s === 60) {
    m += 1;
    s = 0;
  }

  if (m === 60) {
    h += 1;
    m = 0;
  }

  const timeout = setTimeout(function () {
    s++;
    countingTime();
  }, 1000);

  return {
    h,
    m,
    s,
    timeout,
  };
}

export default countingTime;
