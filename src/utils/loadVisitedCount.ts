 const loadVisitedCount = () => {
    const visitedcount = Number(localStorage.getItem("count"));
    if (!isNaN(visitedcount) && visitedcount > 0) {
      return visitedcount;
    }
    return 0;
}

export default loadVisitedCount;