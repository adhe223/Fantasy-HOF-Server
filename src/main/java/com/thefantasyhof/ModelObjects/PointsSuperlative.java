package com.thefantasyhof.ModelObjects;

public class PointsSuperlative extends Superlative {
    private double value;

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public PointsSuperlative(String owner, String teamName, String year, double value) {
        super(owner, teamName, year);
        this.value = value;
    }
}
