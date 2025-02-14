export const MongooseHelpers = {
  query: {
    buildDateRangeQuery: (dateRange: string) => {
      const [start, end] = dateRange.split(",");
      const query: Record<string, any> = {
        $gte: new Date(start),
      };
      if (end) query.$lte = new Date(end);
      return query;
    },
  }
}