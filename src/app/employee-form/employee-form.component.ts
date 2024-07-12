import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  salaryDetails: any;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      hourlyWage: [0, [Validators.required, Validators.min(0.01)]],
      hoursWorked: [0, [Validators.required, Validators.min(0)]],
      overtimeHours: [0, [Validators.required, Validators.min(0)]],
    });

    this.salaryDetails = null;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const { hourlyWage, hoursWorked, overtimeHours } = this.employeeForm.value;
      const regularSalary = hourlyWage * hoursWorked;
      const overtimeSalary = hourlyWage * 1.5 * overtimeHours;
      const totalSalary = regularSalary + overtimeSalary;
      const deductions = totalSalary * 0.1;
      const netSalary = totalSalary - deductions;

      this.salaryDetails = {
        regularSalary,
        overtimeSalary,
        deductions,
        netSalary
      };
    }
  }
}
