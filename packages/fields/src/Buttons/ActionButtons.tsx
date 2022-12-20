import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const AddButton = ({ onClick }) => {
  return (
    <Tooltip title="Add">
      <IconButton onClick={onClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export const RemoveButton = ({ onClick }) => {
  return (
    <Tooltip title="Remove">
      <IconButton onClick={onClick}>
        <RemoveIcon />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (
    <Tooltip title="Delete">
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export const EditButton = ({ onClick }) => {
  return (
    <Tooltip title="Edit">
      <IconButton onClick={onClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};
