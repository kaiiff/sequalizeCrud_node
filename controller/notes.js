const Notes = require("../models/notes");

const postNote = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    // let data = await Notes.findAll();
    // console.log("------- data:--- ", data);
    let datas = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      status: "Unapproved",
    };
    console.log("---- datas:----- ", datas);
    const data = await Notes.create(datas);
    console.log("---- data:----- ", data);

    return res.status(200).json({
      success: true,
      message: "note created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getNotes = async (req, res) => {
  try {
    const id = req.query.id;

    if (id !== undefined) {
      const data = await Notes.findByPk(id);

      if (!data) {
        return res.status(404).json({
          msg: "No data found",
        });
      } else {
        return res.status(200).json({
          msg: "Data Found",
          data: data,
        });
      }
    } else {
      const data = await Notes.findAll();

      if (data.length === 0) {
        return res.status(404).json({
          msg: "No data found",
        });
      } else {
        return res.status(200).json({
          msg: "Data Found",
          data: data,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const noteToUpdate = await Notes.findOne({
      where: {
        id: noteId,
      },
    });
    if (!noteToUpdate) {
      return res.status(404).json({
        msg: "No data found!",
      });
    }

    const updatedData = {
      title: req.body.title || noteToUpdate.title,
      description: req.body.description || noteToUpdate.description,
    };

    await Notes.update(updatedData, {
      where: {
        id: noteId,
      },
    });

    // Fetch the updated note
    const updatedNote = await Notes.findByPk(noteId);

    return res.status(200).json({
      msg: "Note Updated Successfully!",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deletNotes = async (req, res) => {
  try {
    const { noteId } = req.params;

    const noteToDelete = await Notes.findOne({
      where: {
        id: noteId,
      },
    });
    if (!noteToDelete) {
      return res.status(404).json({
        msg: "No data found!",
      });
    }

    await Notes.destroy({
      where: {
        id: noteId,
      },
    });

    return res.status(200).json({
      msg: "Note Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  postNote,
  getNotes,
  updateNotes,
  deletNotes,
};
