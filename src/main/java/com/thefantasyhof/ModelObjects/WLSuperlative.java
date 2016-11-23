package com.thefantasyhof.ModelObjects;

public class WLSuperlative extends Superlative {
    private int value;

    public int getValue() {
        return value;
    }
    public void setValue(int value) {
        this.value = value;
    }

    public WLSuperlative(String owner, String teamName, String year, int value) {
        super(owner, teamName, year);
        this.value = value;
    }
}
