package harker.techtest;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Person {

    @Id
    public String id;

    // Task 1
    public String firstName;

    public String lastName;

    public LocalDate dob;
}