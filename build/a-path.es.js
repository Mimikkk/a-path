var o;
((g) => {
  g.get = (n, l) => {
    try {
      const s = l.split(".");
      let e = n;
      for (let t = 0, r = s.length; t < r; ++t)
        e = e[s[t]];
      return e;
    } catch {
      return;
    }
  }, g.set = (n, l, s) => {
    const e = l.split(".");
    let t = n;
    for (let r = 0, c = e.length - 1; r < c; ++r) {
      const i = e[r];
      i in t || (t[i] = {}), t = t[i];
    }
    return t[e[e.length - 1]] = s, n;
  };
})(o || (o = {}));
export {
  o as Path
};
