
const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  listContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "80px"
  },
  storyGroup: {
    marginBottom: "35px",
    width: "90%"
  },
  story: {
    header: {
      points: {
        display: "inline-block",
        fontWeight: "200",
        color: "#777",
        width: "75px"
      },
      title: {
        display: "block",
        color: "#777"
      }
    },
    points: {
      display: "inline-block",
      width: "150px",
      fontSize: "13px",
      color: "#888"
    },
    title: {
      display: "block"
    },
    domain: {
      fontSize: "13px",
      color: "#888",
      display: "inline-block"
    }
  }
};

export default styles;
