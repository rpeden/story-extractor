
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
        display: "inline-block",
        color: "#777",
        maxWidth: "800px"
      }
    },
    points: {
      display: "inline-block",
      width: "75px"
    },
    title: {
      display: "inline-block",
      maxWidth: "800px"
    },
    domain: {
      fontSize: "13px",
      color: "#888"
    }
  }
};

export default styles;
