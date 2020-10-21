import { useEffect, useState } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { removeTag, getAllTags,create} from '../../actions/tag';


const Tag = () => {
  const [values, setValue] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    remove: false,
    reload: false
  });

  const { name, error, success, tags, remove, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    // use effect always require a function to do its task
    loadTag();
  }, [reload]);


  // function to load category

  const loadTag = () => {
    getAllTags().then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        console.log(tags);
        setValue({ ...values, tags: data });
      }
    });
  }

  const showTag = () => {
    return tags.map((c, i) => {
      return (
        <button onDoubleClick={() => { deleteConfirm(c.slug) }} title="double click to delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{c.name}</button>
      );
    });
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this categoryS');
    if (answer) {
      deleteTag(slug);
    }
  }

  const deleteTag = (slug) => {
    removeTag(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        setValue({ ...values, error: data.error, success: false, remove: !remove, reload: !reload });
      }
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    //backend call for creating  category
    create({ name }, token).then((data, err) => {
      if (data.error) {
        setValue({ ...values, error: data.error, success: false })
      }
      else {
        setValue({ ...values, error: false, success: true, name: '', remove: false, reload: !reload });
      }
    })

  }

  const handleChange = (e) => {
    setValue({ ...values, name: e.target.value, error: false, success: false, remove: '' });
  }


  const showSuccess = () => {
    if (success) {
      return (
        <p className="text-success">Tag is created</p>
      );
    }
  }

  const showError = () => {
    if (error) {
      return (
        <p className="text-danger">Tag already existed</p>
      );
    }
  }

  const showRemoved = () => {
    if (remove) {
      return (
        <p className="text-info">Tag is removed</p>
      );
    }
  }

  const mouseMoveHandler = () => {
    setValue({ ...values,error: false, success: false, remove: '' });
  }

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} required />
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTag()}
      </div>
    </React.Fragment>
  )

}

export default Tag