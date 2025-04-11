document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.querySelector('button');
    const noteInput = document.querySelector('input');
    const container = document.querySelector('.container');
    
    let notesContainer = document.querySelector('.notes-container');
    if (!notesContainer) {
        notesContainer = document.createElement('div');
        notesContainer.className = 'notes-container';
        notesContainer.style.display = 'flex';
        notesContainer.style.flexWrap = 'wrap';
        notesContainer.style.justifyContent = 'center';
        notesContainer.style.width = '90%';
        container.insertAdjacentElement('afterend', notesContainer);
    }
    
    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'notediv';
        
            
            const noteContent = document.createElement('p');
            noteContent.textContent = noteText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.position = 'absolute';
            deleteBtn.style.bottom = '5px';
            deleteBtn.style.right = '5px';
            deleteBtn.style.backgroundColor = '#ff6b6b';
            deleteBtn.style.color = 'white';
            deleteBtn.style.border = 'none';
            deleteBtn.style.borderRadius = '3px';
            deleteBtn.style.padding = '3px 8px';
            deleteBtn.style.cursor = 'pointer';
            
            deleteBtn.addEventListener('click', function() {
                noteDiv.remove();
                saveNotes();
            });
        
            noteDiv.appendChild(noteContent);
            noteDiv.appendChild(deleteBtn);
            notesContainer.appendChild(noteDiv);
            
            noteInput.value = '';
            saveNotes();
        }
    }
    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.notediv p').forEach(note => {
            notes.push(note.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(noteText => {
            noteInput.value = noteText;
            addNote();
        });
    }
    
    addButton.addEventListener('click', addNote);
    
    noteInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNote();
        }
    });

    loadNotes();
});