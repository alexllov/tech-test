package harker.techtest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

    // Change these to be the URL paths you want
    private final String urlPath = "/person";

    @GetMapping(urlPath)
    public List<Person> getPeople() {
        return personService.getAllPeople();
    }

    @GetMapping(urlPath + "/{id}")
    public Person getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id);
    }

    @PostMapping(urlPath)
    public Person postPerson(@RequestBody Person personModel) {
        return personService.postPerson(personModel);
    }

    // Task 3
    @PutMapping(urlPath + "/{id}")
    public Person putPerson(@PathVariable("id") String id, @RequestBody Person personModel) {
        return personService.putPerson(id, personModel);
    }

}