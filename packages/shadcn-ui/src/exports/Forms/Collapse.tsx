import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '../../components/ui/collapsible'

import { LucideArrowUpCircle, LucideArrowDownCircle } from "lucide-react"
import { Button } from '../../components/ui/button';

export function FieldCollapse({ children, error, title }) {
  const [open, setOpen] = useState(true);
  const errorLength = Object.keys(error || {}).length;

  const errorMessage = !!errorLength && (
    <div className='px-2 text-sm text-red-500'>
      {errorLength === 1 ? `There is one error in this field` : `There are ${errorLength} errors in this field`}
    </div>
  );

  return (
    <Card>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between" onClick={() => setOpen(!open)}>
          <CardHeader className='cursor-pointer'>
            <CardTitle>{title ?? 'Field'}</CardTitle>
          </CardHeader>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 w-9">
              {open ? <LucideArrowUpCircle className="w-5 h-5" /> : <LucideArrowDownCircle className="w-5 h-5" />}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
      {errorMessage}
    </Card>
  );
}
