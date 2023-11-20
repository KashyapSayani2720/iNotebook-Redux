import React, { useState, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useCreateNoteMutation, useDeleteNoteByIdMutation, useGetallNotesQuery, useUpdateNoteMutation } from '../services/note';

export default function Home() {
  let emptyNote = {
    _id: null,
    title: '',
    description: '',
    tag: ''
  };

  const [noteDialog, setNoteDialog] = useState(false);
  const [deleteNoteDialog, setDeleteNoteDialog] = useState(false);
  const [note, setNote] = useState(emptyNote);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

  const { data, isLoading, isError } = useGetallNotesQuery({refetchOnMountOrArgChange: true});
  const [addNotes] = useCreateNoteMutation();
  const [updatenote] = useUpdateNoteMutation();
  const [deleteNoteById] = useDeleteNoteByIdMutation();
  

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (isError) {
    <div>Something wenr wrong ...</div>
  }

  const openNew = () => {
    setNote(emptyNote);
    setSubmitted(false);
    setNoteDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setNoteDialog(false);
  };

  const hideDeleteNoteDialog = () => {
    setDeleteNoteDialog(false);
  };

  const saveNote = async () => {
    setSubmitted(true);

    if (note.title.trim()) {
      if (note._id) {
        const response = await updatenote(note);
        if(response["data"]["success"]){
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Note Updated', life: 3000 });
        }
      } else {
        const response = await addNotes(note);
        if(response["data"]["success"]){
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Note Created', life: 3000 });
        }
      }

      setNoteDialog(false);
    }
  };

  const editNote = (note) => {
    setNote({ ...note });
    setNoteDialog(true);
  };

  const confirmDeleteNote = (note) => {
    setNote(note);
    setDeleteNoteDialog(true);
  };

  const deleteNote = async () => {

    setDeleteNoteDialog(false);
    const response = await deleteNoteById(note._id);

    if(response["data"]["success"]) {
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Note Deleted', life: 3000 });
    };

  };
  
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _note = { ...note };

    _note[`${name}`] = val;

    setNote(_note);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editNote(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteNote(rowData)} />
      </React.Fragment>
    );
  };


  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Notes</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );
  const noteDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveNote} />
    </React.Fragment>
  );
  const deleteNoteDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteNoteDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteNote} />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>

        <DataTable value={data}
          dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} notes" globalFilter={globalFilter} header={header}>
          <Column selectionMode="single" exportable={false}></Column>
          <Column field="title" header="Title" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="description" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="tag" header="Tag" sortable></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={noteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Note Details" modal className="p-fluid" footer={noteDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <InputText id="title" value={note.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !note.title })} />
          {submitted && !note.title && <small className="p-error">Title is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <InputTextarea id="description" value={note.description} required onChange={(e) => onInputChange(e, 'description')} rows={3} cols={20} />
          {submitted && !note.description && <small className="p-error">Description is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Tag
          </label>
          <InputText id="tag" value={note.tag} required onChange={(e) => onInputChange(e, 'tag')} rows={3} cols={20} />
          {submitted && !note.tag && <small className="p-error">Tag is required.</small>}
        </div>
      </Dialog>

      <Dialog visible={deleteNoteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteNoteDialogFooter} onHide={hideDeleteNoteDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {note && (
            <span>
              Are you sure you want to delete <b>{note.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
