import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { buildSearchQuery } from '../utils/functions';

function Form() {
    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
          terms: [{ term: '', synonyms: '', antonyms: '' }]
        }
      });
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'terms'
      });
    
      const watchedFields = watch("terms");
      const formData = watch();
      const [searchQuery, setSearchQuery] = useState('');
    
      const handleTextareaChange = (event: any) => {
        setSearchQuery(event.target.value);
      };
    
      const copyToClipboard = () => {
        navigator.clipboard.writeText(searchQuery).then(() => {
          console.log(`Texto copiado al portapapeles! ${searchQuery}`);
        }).catch(err => {
          console.error('Error al copiar texto: ', err);
        });
      };
      
      useEffect(() => {
        let searchTerms = watchedFields.map(term => ({
          term: term.term,
          synonyms: term.synonyms.split(',').map(s => s.trim()),
          antonyms: term.antonyms.split(',').map(a => a.trim())
        }));
    
        let query = buildSearchQuery(searchTerms);
        setSearchQuery(query);
      }, [formData]);    
  return (
    <div>
            <form>
        {fields.map((field, index) => (
          <div className="item" key={field.id} >
            <div>
              <label htmlFor={`term-${index}`}>Keyword</label>
              <input type="text" id={`term-${index}`} {...register(`terms.${index}.term`)}/>
            </div>
  
            <div>
              <label htmlFor={`synonyms-${index}`}>Synonyms</label>
              <input type="text" id={`synonyms-${index}`} {...register(`terms.${index}.synonyms`)}/>
            </div>
            
            <div>
              <label htmlFor={`antonyms-${index}`}>Antonyms</label>
              <input type="text" id={`antonyms-${index}`} {...register(`terms.${index}.antonyms`)}/>
            </div>

            <button type="button" onClick={() => remove(index)}>X</button>
          </div>
        ))}
        <button type="button" className='add-btn' onClick={() => append({ term: '', synonyms: '', antonyms: '' })}>Add keyword</button>

      </form>
      <div>
      <label>Search Query:</label><br />
      <textarea value={searchQuery} onChange={handleTextareaChange} readOnly />
      <br />
      <button type='button' onClick={copyToClipboard}>Copiar</button>
    </div>
    </div>
  )
}

export default Form
