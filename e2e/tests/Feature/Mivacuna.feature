Feature: tests in Mivacuna site
    @smoke @Mivacuna
    Scenario Outline: i will check the error message into the no null field id type into the form
        Given open web page "<page>"
        When click in the button consultar mi priorizacion
        And click in the acepto button
        And type the identification "<number>"
        And type the confirmation identification "<number>"
        And click in calendar
        And click in day into calendar
        And Submit form
        Then get error on tipo de documento equal to "<error>"
        Examples:
            | page                                       | number      | error              |
            | https://mivacuna.sispro.gov.co/MiVacuna?v1 | 11166657481 | Campo obligatorio |
