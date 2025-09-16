class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // 1. Filtering
  filter() {
    const excludedFields = ["limit", "fields", "sort", "page"];
    const queryObj = { ...this.queryStr };

    // Remove excluded fields from query object
    excludedFields.forEach((field) => delete queryObj[field]);

    // Convert operators like gte, gt, lte, lt into MongoDB operators ($gte etc.)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // 2. Sorting
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort (e.g. newest first)
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // 3. Field Limiting (Projection)
  fields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); // exclude __v by default
    }
    return this;
  }

  // 4. Pagination
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;
