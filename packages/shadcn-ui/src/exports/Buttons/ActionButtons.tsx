import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip'
import { Plus, Edit, Trash, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"

export const AddButton = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-6 h-6 p-0 ml-1" onClick={onClick}>
            <Plus className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Add
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const RemoveButton = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-6 h-6 p-0 ml-1" onClick={onClick}>
            <Trash className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Remove
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className='w-6 h-6 p-0 ml-1' onClick={onClick}>
            <Trash className='w-4 h-4'/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Delete
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const EditButton = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-6 h-6 p-0 ml-1" onClick={onClick}>
            <Edit className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Edit
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
