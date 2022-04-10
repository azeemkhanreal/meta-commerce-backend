const getOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await model.findById(id);
    const { password, ...others } = doc._doc;
    res.status(200).json({ data: others });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create(req.body);
    res.status(201).json({ data: doc });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
const getAll = (model) => async (req, res) => {
  const queries = req.query; // query -> new=true, limit=5
  try {
    const doc = queries.new
      ? await model.find().limit(queries.limit).sort({ _id: -1 })
      : await model.find().limit(queries.limit);
    res.status(200).json({ data: docs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateOne = (model) => async (req, res) => {
  // check user is admin, if true then accepted to update other not allow to do that
  if (req.user.isAdmin) {
    try {
      const updatedDoc = await model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ data: updatedDoc });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(400).end("You are not allow to do that");
  }
};
const removeOne = (model) => async (req, res) => {
  try {
    const deletedDoc = await model.findByIdAndRemove(req.params.id);
    res.status(200).json({ ok: 1 });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const crudControllers = (model) => ({
  getOne: getOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
  getAll: getAll(model),
  createOne: createOne(model),
});

module.exports = crudControllers;
