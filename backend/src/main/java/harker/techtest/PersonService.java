package harker.techtest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public List<Person> getAllPeople() {
        List<Person> people = new ArrayList<>();

        personRepository.findAll().forEach(people::add);

        return people;
    }

    public Person getPerson(String id) {
        return personRepository.findById(id).orElseThrow(() -> new RuntimeException("Value not present"));
    }

    public Person postPerson(Person person) {
        // Task 2
        return personRepository.save(person);

    }
    // Task 3

    public Person putPerson(String id, Person personData) {
        Person personRecord = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Value not present"));

        if (Objects.nonNull(personData.firstName) && !"".equalsIgnoreCase(personData.firstName)) {
            personRecord.firstName = personData.firstName;
        }

        if (Objects.nonNull(personData.lastName) && !"".equalsIgnoreCase(personData.lastName)) {
            personRecord.lastName = personData.lastName;
        }

        if (Objects.nonNull(personData.dob)) {
            personRecord.dob = personData.dob;
        }

        return personRepository.save(personRecord);
    }
}