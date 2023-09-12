class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async insertOne(item) {
    const data = this.#model(item);
    await data.save();
    return data;
  }

  async findAll(
    query = {},
    option = {
      select: '',
      skip: 0,
      limit: undefined,
      populate: undefined,
      sort: {
        createdAt: -1,
      },
    }
  ) {
    const { select, skip, limit, populate, sort } = option;
    let data = await this.#model
      .find(query)
      .select(select)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean({ virtuals: true })
      .populate(populate)
      .exec();
    return data;
  }

  async findById(id, option = { select: '', populate: undefined }) {
    const { select, populate } = option;
    const data = await this.#model.findById(id).select(select).lean().exec();
    if (populate) data = data.populate(populate);
    return data;
  }

  async findOne(query, option = { select: '', populate: undefined }) {
    const { select, populate } = option;
    const data = await this.#model.findOne(query).select(select).lean().exec();
    if (populate) data = data.populate(populate);
    return data;
  }

  async updateById(id, item) {
    const data = await this.#model
      .findByIdAndUpdate(id, item, { new: true })
      .lean()
      .exec();
    return data;
  }

  async updateOne(query, item) {
    const data = await this.#model
      .findOneAndUpdate(query, item, { new: true })
      .lean()
      .exec();
    return data;
  }

  async deleteById(id) {
    return await this.#model.findByIdAndDelete(id).lean().exec();
  }

  async deleteOne(id) {
    return await this.#model.findOneAndDelete(id).lean().exec();
  }
}

export default BaseRepository;
