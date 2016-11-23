package com.thefantasyhof.ModelObjects;

public abstract class Superlative {
    private String owner;
    private String teamName;
    private String year;

    //<editor-fold desc="Getters/Setters">
    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
    //</editor-fold>

    public Superlative(String owner, String teamName, String year) {
        this.owner = owner;
        this.teamName = teamName;
        this.year = year;
    }
}
