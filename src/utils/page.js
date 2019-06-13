export default () => {
  return {
    handlePageChange(val) {
      this.query.pageObj.current = val
      this.search()
    },
    handleSizeChange(val) {
      this.query.pageObj.size = val
      this.search()
    },
    thePrevPage(val) {
      this.query.pageObj.current = val
      this.search()
    },
    theNextPage(val) {
      this.query.pageObj.current = val
      this.search()
    }
  }
}
