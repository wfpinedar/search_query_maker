type SearchTerm = {
    term: string,
    synonyms: string[],
    antonyms: string[]
  };
  
export const buildSearchQuery = (data: any) => {
    let queryParts: string[] = [];
  
    let operators = ["AND", "OR"];
    let proximity = 5;
  
    data.forEach((term: any, index:any) => {
        let synonyms = term.synonyms.join(" OR ");
        let antonyms = term.antonyms.join(" NOT ");
        let termQuery = `((${term.term}* OR ${synonyms}) NOT ${antonyms})`;
  
        queryParts.push(termQuery);
  
        // TODO: add for word serparation 
        // if (index < data.length - 1) {
        //     queryParts.push(operators[index]);
        //     queryParts.push(`W/${proximity}`);
        // }
    });
    return queryParts.join(" ")
};