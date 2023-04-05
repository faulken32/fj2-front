import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IJobCat } from '../job-cat.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../job-cat.test-samples';

import { JobCatService } from './job-cat.service';

const requireRestSample: IJobCat = {
  ...sampleWithRequiredData,
};

describe('JobCat Service', () => {
  let service: JobCatService;
  let httpMock: HttpTestingController;
  let expectedResult: IJobCat | IJobCat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JobCatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a JobCat', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jobCat = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(jobCat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobCat', () => {
      const jobCat = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(jobCat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobCat', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobCat', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a JobCat', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addJobCatToCollectionIfMissing', () => {
      it('should add a JobCat to an empty array', () => {
        const jobCat: IJobCat = sampleWithRequiredData;
        expectedResult = service.addJobCatToCollectionIfMissing([], jobCat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobCat);
      });

      it('should not add a JobCat to an array that contains it', () => {
        const jobCat: IJobCat = sampleWithRequiredData;
        const jobCatCollection: IJobCat[] = [
          {
            ...jobCat,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addJobCatToCollectionIfMissing(jobCatCollection, jobCat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobCat to an array that doesn't contain it", () => {
        const jobCat: IJobCat = sampleWithRequiredData;
        const jobCatCollection: IJobCat[] = [sampleWithPartialData];
        expectedResult = service.addJobCatToCollectionIfMissing(jobCatCollection, jobCat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobCat);
      });

      it('should add only unique JobCat to an array', () => {
        const jobCatArray: IJobCat[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const jobCatCollection: IJobCat[] = [sampleWithRequiredData];
        expectedResult = service.addJobCatToCollectionIfMissing(jobCatCollection, ...jobCatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const jobCat: IJobCat = sampleWithRequiredData;
        const jobCat2: IJobCat = sampleWithPartialData;
        expectedResult = service.addJobCatToCollectionIfMissing([], jobCat, jobCat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobCat);
        expect(expectedResult).toContain(jobCat2);
      });

      it('should accept null and undefined values', () => {
        const jobCat: IJobCat = sampleWithRequiredData;
        expectedResult = service.addJobCatToCollectionIfMissing([], null, jobCat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobCat);
      });

      it('should return initial array if no JobCat is added', () => {
        const jobCatCollection: IJobCat[] = [sampleWithRequiredData];
        expectedResult = service.addJobCatToCollectionIfMissing(jobCatCollection, undefined, null);
        expect(expectedResult).toEqual(jobCatCollection);
      });
    });

    describe('compareJobCat', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareJobCat(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareJobCat(entity1, entity2);
        const compareResult2 = service.compareJobCat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareJobCat(entity1, entity2);
        const compareResult2 = service.compareJobCat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareJobCat(entity1, entity2);
        const compareResult2 = service.compareJobCat(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
