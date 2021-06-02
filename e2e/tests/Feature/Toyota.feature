Feature: Toyota híbrida
    @Toyota
    Scenario Outline: Validacion de la tabla de gestion de edificos
        Given open web page "<page>"
        When click in the carousel button "<num>"
        And click in the carousel image "<num>"
        Then get the text

        Examples:
            | page                       | num |
            | https://www.toyota.com.co/ | 7   |
